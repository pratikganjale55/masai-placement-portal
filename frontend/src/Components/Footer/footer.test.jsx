import { render, screen, fireEvent } from "../../test-utils";
import Footer from "./index";

describe("Footer Componenet",()=>{
    beforeEach(() => {
      render(<Footer />);
    });
    test("Renders correctly", () => {
      render(<Footer />);
    });

    // test("should open facebook link in new tab when clicked",() => {
    //   const link = screen.getByTestId("facebook");
    //   fireEvent.click(link);
    //   expect(link).toHaveAttribute("/https://www.facebook.com/", "_blank");
    // });
    
})
