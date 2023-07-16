export class Hello {
  public sayHello() {
    return "hello, world!";
  }
}

test("hello", () => {
  expect(new Hello().sayHello()).toBe("hello, world!");
});
