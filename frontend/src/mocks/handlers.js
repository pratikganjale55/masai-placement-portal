import { rest } from "msw";

const signupData = {
  name: "Pankaj",
  email: "pankajkr885@gmail.com",
  password: "Pankaj@123",
  rePassword: "Pankaj@123",
  role: "Admin",
};

export const handlers = [
  rest.post(
    "https://test-production-e6c2.up.railway.app/auth/signup",
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: signupData,
        })
      );
    }
  ),
];
