// Test the component Contacts
import { shallowMount } from "@vue/test-utils";
import Contacts from "@/components/Contacts";

import Vue from "vue";
import Vuetify from "vuetify";
Vue.config.productionTip = false;
Vue.use(Vuetify);

describe("The Contacts.vue component", () => {
  let wrapper;
  // call function before each test
  beforeEach(() => {
    wrapper = shallowMount(Contacts, {
      propsData: {
        contacts: [],
      },
    });
  });

  // rendring test
  it("Can be mounted", () => {
    expect(wrapper.exists());
  });

  it("recieving props check", () => {
    expect(wrapper.vm.contacts).toEqual([]);
  });
});
