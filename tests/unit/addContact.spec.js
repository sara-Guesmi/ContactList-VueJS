// Test the addContact component Contacts
import { shallowMount } from "@vue/test-utils";
import addContact from "@/components/addContact";

// describe the behaviour of add Task
describe("AddTask component", () => {
  let wrapper;
  // call function before each test
  beforeEach(() => {
    wrapper = shallowMount(addContact);
  });
  // rendring test
  it("render ", () => {
    expect(wrapper.exists());
  });
  // test addTask
  // it("addTask method", () => {});
});

// it("allows for adding one contact item", async () => {
//   const wrapper = shallowMount(addContact, {
//     propsData: {
//       title: "My list",
//     },
//   });

//   wrapper.find('[data-testid="todo-input"]').setValue("My first todo item");
//   await wrapper.find('[data-testid="todo-submit"]').trigger("click");
//   expect(wrapper.find('[data-testid="todos"]').text()).toContain(
//     "My first todo item"
//   );
// });
