import { fireEvent, render, screen } from "../../test-utils";
import Signup from "./index";

describe("Signup", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });
  beforeEach(() => {
    render(<Signup />);
  });

  test("Renders correctly", () => {
    render(<Signup />);
  });

  test("signup left side image", () => {
    const signupImage = screen.getByRole("img", { name: /signupimage/i });
    expect(signupImage).toBeInTheDocument();
  });

  test("MasaiLogo", () => {
    const masaiLogo = screen.getByRole("img", { name: /logo/i });
    expect(masaiLogo).toBeInTheDocument();
  });

  // test("Checking nameInput", async () => {
  //   const nameInput = screen.getByRole("textbox", { name: /name/i });
  //   fireEvent.change(nameInput, { target: { value: " " } });

  //   const emptyNameError = screen.getByText(/Name cannot be empty spaces/i);
  //   expect(emptyNameError).toBeVisible();

  //   const fourCharacterError = screen.getByText(
  //     /'name' must be at least 4 characters/i
  //   );
  //   expect(fourCharacterError).toBeVisible();
  // });

  test("is login routing working?", () => {
    const loginRouting = screen.getByRole("button", {
      name: /i already have an account/i,
    });
    fireEvent.click(loginRouting);
    expect(window.location.pathname).toBe("/login");
  });
});
