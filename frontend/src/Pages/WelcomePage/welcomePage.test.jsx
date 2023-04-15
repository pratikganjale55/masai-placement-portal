import { render, screen, within, fireEvent } from "../../test-utils";
import WelcomePage from "./index";

describe("Welcome Page", () => {
  // beforeAll(()=>{
  //   console.log("WelcomePage Testing Started");
  // })
  beforeEach(() => {
    render(<WelcomePage />);
  });

  test("Renders correctly", () => {
    render(<WelcomePage />);
  });

  test("MasaiLogo", () => {
    const masaiLogo = screen.getByRole("img", { name: /logo/i });
    expect(masaiLogo).toBeInTheDocument();
  });

  test("Masai Placement Portal heading", () => {
    const heading = screen.getByRole("heading", {
      name: /welcome to masai placement portal/i,
    });
    within(heading).getByText(/masai placement portal/i);
    expect(heading).toBeInTheDocument();
  });

  test("is signupButton present?", () => {
    const signupButton = screen.getByRole("button", {
      name: /i am new here\.\.\. signup/i,
    });
    expect(signupButton).toBeInTheDocument();
  });

  test("is loginButton present?", () => {
    const loginButton = screen.getByRole("button", {
      name: /already have account\.\.\. login/i,
    });
    expect(loginButton).toBeInTheDocument();
  });

  test("is signup routing working?", () => {
    const signupRouting = screen.getByRole("button", {
      name: /i am new here\.\.\. signup/i,
    });
    fireEvent.click(signupRouting);
    expect(window.location.pathname).toBe("/signup");
  });

  test("is login routing working?", () => {
    const loginRouting = screen.getByRole("button", {
      name: /already have account\.\.\. login/i,
    });
    fireEvent.click(loginRouting);
    expect(window.location.pathname).toBe("/login");
  });

  test("is client1 image present?", () => {
    const client1 = screen.getByRole("img", { name: /client-1/i });
    expect(client1).toBeInTheDocument();
  });

  test("is client2 image present?", () => {
    const client2 = screen.getByRole("img", { name: /client-2/i });
    expect(client2).toBeInTheDocument();
  });

  test("is antDesign accordian question1 working?", () => {
    const question1 = screen.getByRole("tab", {
      name: /caret-right q: what is the masai placement portal\?/i,
    });

    expect(question1).toBeInTheDocument();
    fireEvent.click(question1);

    const answer1 = screen.getByText(
      /the masai placement portal is an online platform that connects job seekers with employers\./i,
      { exact: false }
    );
    expect(answer1).toBeVisible();
  });

  test("is antDesign accordian question2 working?", () => {
    const question2 = screen.getByRole("tab", {
      name: /caret\-right q: who can use the masai placement portal\?/i,
    });

    expect(question2).toBeInTheDocument();
    fireEvent.click(question2);

    const answer2 = screen.getByText(
      /but it may also be available to other job seekers based on the discretion of masai school\./i,
      { exact: false }
    );
    expect(answer2).toBeVisible();
  });

  test("is antDesign accordian question3 working?", () => {
    const question3 = screen.getByRole("tab", {
      name: /caret\-right q: how do i create an account on the masai placement portal\?/i,
    });

    expect(question3).toBeInTheDocument();
    fireEvent.click(question3);

    const answer3 = screen.getByText(
      /if you are a job seeker who is not affiliated with masai school, you can create your account \./i,
      { exact: false }
    );
    expect(answer3).toBeVisible();
  });

  // afterAll(()=>{
  //   console.log("WelcomePage Testing Done")
  // })
});

// test("should open twitter link in new tab when clicked", () => {
//   const link = screen.getByTestId("twitter");
//   fireEvent.click(link);
//   expect(link).toHaveAttribute("https://twitter.com/", "_blank");
// });

// test("should open instagram link in new tab when clicked", () => {
//   const link = screen.getByTestId("instagram");
//   fireEvent.click(link);
//   expect(link).toHaveAttribute("https://www.instagram.com/", "_blank");
// });

// test("should open linkedin link in new tab when clicked", () => {
//   const link = screen.getByTestId("linkedin");
//   fireEvent.click(link);
//   expect(link).toHaveAttribute("https://www.linkedin.com/", "_blank");
// });

// test("should open youtube link in new tab when clicked", () => {
//   const link = screen.getByTestId("youtube");
//   fireEvent.click(link);
//   expect(link).toHaveAttribute("https://www.youtube.com/", "_blank");
// });
