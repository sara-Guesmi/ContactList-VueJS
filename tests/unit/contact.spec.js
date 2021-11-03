// Test the component Contacts
import { shallowMount } from "@vue/test-utils";
import Contact from "@/components/Contact";
import Vue from "vue";

describe("The Contact.vue component", () => {
  let wrapper;
  // call function before each test
  beforeEach(() => {
    wrapper = shallowMount(Contact, {
      propsData: {
        contact: {},
      },
    });
  });

  // rendring test
  it("Can be mounted", () => {
    expect(wrapper.exists());
  });
  it("recieving props check", async () => {
    // Update the props passed in to the Contact component
    wrapper.setProps({
      contact: {
        id: 1,
        firstName: "Leanne",
        lastName: "Bret",
        email: "Sincere@april.biz",
        gender: "female",
      },
    });

    await Vue.nextTick();

    // check that the prop data is stored as expected within the component
    console.log(wrapper.vm.contact.id);
    expect(wrapper.vm.contact.id).toEqual(1);
    expect(wrapper.vm.contact.firstName).toEqual("Leanne");
    expect(wrapper.vm.contact.lastName).toEqual("Bret");
    expect(wrapper.vm.contact.email).toEqual("Sincere@april.biz");
    expect(wrapper.vm.contact.gender).toEqual("female");
    // check that the heading text is rendered
    expect(wrapper.find(".name").text()).toEqual("Leanne Bret");
    expect(wrapper.find(".email").text()).toMatch("Sincere@april.biz");
  });
});
