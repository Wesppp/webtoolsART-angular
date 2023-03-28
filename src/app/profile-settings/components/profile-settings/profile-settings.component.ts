import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentUserInterface}  from "../../../shared/types/currentUser.interface";
import { SelectItem } from "primeng/api";
import { Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { countriesList } from "../../../../assets/static/countries-list";
import { socialNetworksList } from "../../../../assets/static/socialNetworks-list";
import { CountryPhoneService } from "../../services/country-phone.service";
import { UpdateProfileSettingsRequestInterface} from "../../types/updateProfileSettingsRequest.interface";
import { BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import { backendErrorsSelector, currentUserSelector, isSubmittingSelector } from "../../store/selectors";
import { updateProfileSettingsAction } from "../../store/actions/updateProfileSettings.action";
import { updateProfileImageAction } from "../../store/actions/updateProfileImage.action";
import { getCurrentUserAction } from "../../../auth/store/actions/getCurrentUser.action";
import { deleteProfileImageAction } from "../../store/actions/deleteProfileImage.action";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  public form!: FormGroup
  public mask: string = ''
  public profileImage!: File | null
  public countries: SelectItem[] = countriesList
  public socials: SelectItem[] = socialNetworksList

  public currentUser!: CurrentUserInterface | null
  public currentUserSubscription!: Subscription

  public isSubmitting$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder,
              private store: Store,
              private countryPhoneService: CountryPhoneService) {
  }

  ngOnInit(): void {
    this.fetchData()
    this.initializeListeners()
    this.initializeValues()
  }

  createForm(): void {
    this.mask = this.countryPhoneService.getCountryPhoneMask(this.currentUser?.residence || '')

    this.form = this.fb.group({
      username: [this.currentUser?.username,
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      email: [this.currentUser?.email,
        [
          Validators.email,
          Validators.required
        ]
      ],
      specialization: [this.currentUser?.specialization,
        [
          Validators.maxLength(50)
        ]
      ],
      bio: [this.currentUser?.bio,
        [
          Validators.maxLength(300)
        ]
      ],
      phone: [this.currentUser?.phone],
      residence: [{label: this.currentUser?.residence, value: this.currentUser?.residence}],
      socialNetworks: this.fb.array(
        this.currentUser?.socialNetworks
          .map((l) => this.fb.group({
            name: [l.name,
              [
                Validators.required
              ]
            ],
            url: [l.url,
              [
                Validators.required,
                Validators.pattern('^(https?:\\/\\/)?\\w+\\.{1}\\w+\\/\\w+$')
              ]
            ]
          })) || []
      )
    })
  }

  fetchData(): void {
    this.store.dispatch(getCurrentUserAction())
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store.pipe(
      select(currentUserSelector),
    ).subscribe((currentUser: CurrentUserInterface | null) => {
      this.currentUser = currentUser
      this.createForm()
    })
  }

  countrySelected(country: SelectItem) {
    this.phone?.reset()

    if (country) {
      this.mask = this.countryPhoneService.getCountryPhoneMask(country.value)
    }
  }

  addSocialNetwork(): void {
    this.socialNetworks.push(this.fb.group(
      {
        name: ['',
          [
            Validators.required
          ]
        ],
        url: ['',
          [
            Validators.required,
            Validators.pattern('^(https?:\\/\\/)?\\w+\\.{1}\\w+\\/\\w+$')
          ]
        ]
      }
    ))
  }

  removeSocialNetwork(): void {
    this.socialNetworks.removeAt(this.socialNetworks.controls.length - 1)
  }

  submit(formData: any): void {
    const { phone, residence } = formData
    const request: UpdateProfileSettingsRequestInterface = {
      ...formData,
      phone: this.countryPhoneService.getFullPhoneNumber(phone, residence?.value),
      residence: residence?.value || ''
    }

    this.store.dispatch(updateProfileSettingsAction({ request }))
  }

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get bio() {
    return this.form.get('bio')
  }

  get phone() {
    return this.form.get('phone')
  }

  get residence() {
    return this.form.get('residence')
  }

  get socialNetworks() {
    return this.form.controls['socialNetworks'] as FormArray
  }

  get specialization() {
    return this.form.get('specialization')
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  onSelectFile($event: any): void {
    if($event.target.value) {
      this.profileImage = <File>$event.target.files[0]
    }
  }

  submitProfileImage(): void {
    let fb = new FormData()
    if (this.profileImage) {
      fb.append('avatar', this.profileImage, this.profileImage.name)

      this.store.dispatch(updateProfileImageAction({ request: fb }))

      this.profileImage = null
    }
  }

  clearProfileImage(): void {
    const path: string | undefined = this.currentUser?.profileImage
    if (path) {
      this.store.dispatch(deleteProfileImageAction())
      this.profileImage = null
    }
    this.profileImage = null
  }
}
