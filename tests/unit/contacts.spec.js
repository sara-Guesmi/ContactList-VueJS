// Test the component Contacts
import { shallowMount } from "@vue/test-utils";
import Contacts from "@/components/Contacts";

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
