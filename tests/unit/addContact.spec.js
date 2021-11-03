// Test the addContact component Contacts
import { shallowMount } from "@vue/test-utils";
import addContact from "@/components/addContact";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.config.productionTip = false;
Vue.use(Vuetify);

// describe the behaviour of add Task
describe("AddTask component", () => {
  let wrapper;

  // call function before each test
  beforeEach(() => {
    wrapper = shallowMount(addContact, {
      propsData: {
        isEdit: false,
      },
    });
  });

  // rendring test
  it("render ", () => {
    expect(wrapper.exists());
  });

  // --------------------------------------------------
  // test  the add  event Emit
  it("emits a custom event when Add button is clicked", async () => {
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted()).toBeTruthy();
  });
});
