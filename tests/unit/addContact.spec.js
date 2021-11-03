// Test the addContact component Contacts
import { shallowMount } from "@vue/test-utils";
import addContact from "@/components/addContact";

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
  // it("emits a custom event when Add button is clicked", async () => {
  //   // Update the props passed in to the Contact component
  //   wrapper.setProps({
  //     isEdit: false,
  //   });

  //   await Vue.nextTick();
  //   if (!wrapper.vm.isEdit) {
  //     // trigger an event when the 'Delete' button is clicked
  //     wrapper.find(".add").trigger("click");

  //     // check that 1 occurrence of the event has been emitted
  //     expect(wrapper.emitted("addContact")).toBeTruthy();
  //     expect(wrapper.emitted("addContact").length).toBe(1);
  //   }
  // });
});
