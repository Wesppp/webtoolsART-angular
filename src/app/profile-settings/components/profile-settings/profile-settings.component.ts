import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CountrySelectInterface} from "../../types/countrySelect.interface";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {SelectItem} from "primeng/api";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../../../auth/store/selectors";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  public form!: FormGroup
  public countries!: CountrySelectInterface[]
  public socials!: SelectItem[]

  public currentUser!: CurrentUserInterface | null
  public currentUserSubscription!: Subscription

  constructor(private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }

  createForm(): void {
    this.form = this.fb.group({
      username: [this.currentUser?.username,
        [

        ]
      ],
      email: [this.currentUser?.email,
        [

        ]
      ],
      bio: [this.currentUser?.bio,
        [

        ]
      ],
      phone: [this.currentUser?.phone,
        [

        ]
      ],
      residence: [this.currentUser?.residence,
        [

        ]
      ],
      socialNetworks: this.fb.array(
        this.currentUser?.socialNetworks
          .map((l) => this.fb.group(l)) || []
      )
    })
  }

  initializeValues(): void {
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ]

    this.socials = [
      { label: 'github', value: 'github' },
      { label: 'telegram', value: 'telegram' },
      { label: 'instagram', value: 'instagram' },
      { label: 'twitter', value: 'twitter' },
    ]
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store.pipe(
      select(currentUserSelector)
    ).subscribe((currentUser: CurrentUserInterface | null) => {
      this.currentUser = currentUser
      this.createForm()
    })
  }

  submit(): void {
    console.log(this.form.value)
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

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
