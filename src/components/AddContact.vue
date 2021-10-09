<template>
  <v-container fluid>
    <v-row justify="center" align="baseline" class="mt-5">
      <v-col md="4">
        <v-text-field
          v-if="!isEdit"
          label="enter searched contact"
          v-model="searchedContact"
          @input="handleSearch"
          append-icon="mdi-magnify"
        ></v-text-field
      ></v-col>
      <v-col md="2">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-if="isEdit" class="mr-16">
              <v-icon color="grey" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
            </v-btn>

            <v-btn v-else color="red lighten-2" dark v-bind="attrs" v-on="on">
              Add Contact
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ title }} </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <form>
                  <v-text-field
                    v-model="firstName"
                    :error-messages="firstNameErrors"
                    :counter="10"
                    label="firstName"
                    required
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="lastName"
                    :error-messages="lastNameErrors"
                    :counter="10"
                    label="lastName"
                    required
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-select
                    v-model="gender"
                    :items="items"
                    :error-messages="selectErrors"
                    label="gender"
                    required
                    @change="$v.gender.$touch()"
                    @blur="$v.gender.$touch()"
                  ></v-select>
                  <v-btn
                    class="mr-4 white--text"
                    @click="addContact"
                    color="red lighten-2"
                  >
                    submit
                  </v-btn>
                  <v-btn @click="close"> clear </v-btn>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mdiPencil } from "@mdi/js";

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    gender: { required },
  },
  props: ["contact", "isEdit"],
  data() {
    return {
      title: this.isEdit ? "Edit User" : "Add User",
      dialog: false,
      firstName: this.isEdit ? this.contact.firstName : "",
      lastName: this.isEdit ? this.contact.lastName : "",
      email: this.isEdit ? this.contact.email : "",
      gender: this.isEdit ? this.contact.gender : null,
      items: ["male", "female"],
      icons: {
        mdiPencil,
      },
      searchedContact: "",
    };
  },

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.maxLength &&
        errors.push("firstName must be at most 10 characters long");
      !this.$v.firstName.required && errors.push("firstName is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.maxLength &&
        errors.push("lastName must be at most 10 characters long");
      !this.$v.lastName.required && errors.push("lastName is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.gender.$dirty) return errors;
      !this.$v.gender.required && errors.push("Item is required");
      return errors;
    },
  },

  methods: {
    // close the dialog
    close() {
      this.dialog = false;
    },
    // clear the data to the initial Value
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.gender = "";
    },
    // handle Add ||  Edit Contact Method:
    addContact() {
      //    emit the event if all the inputs are valid
      if (this.firstName && this.lastName && this.firstName && this.gender) {
        // sending out the event dependes on Edit or Add
        if (this.isEdit) {
          // create the edited contact
          const editedContact = {
            id: this.contact.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            gender: this.gender,
          };
          // send out the edit event
          this.$emit("edit-user", editedContact);
        } else {
          // create the newContact
          const newContact = {
            id: Math.random(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            gender: this.gender,
          };
          // send out the add event with the newContact parameter
          this.$emit("addContact", newContact);
          // clear the initial data (inputs)
          this.clear();
        }
        // close the dialog
        this.close();
      }
    },

    // send out the searchContact contact when the input event is on
    handleSearch() {
      this.$emit("search-contact", this.searchedContact);
    },
  },
};
</script>