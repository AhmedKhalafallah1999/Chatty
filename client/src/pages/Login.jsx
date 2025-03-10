import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import loader from "../assets/images/loader.gif";
// import { useChattyContext } from "./Home";
const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // fontSize: "24px"
}));
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await fetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  if (result.ok) {
    toast.success(response.msg);
    return redirect("/home");
  } else {
    return toast.error(response.msg);
  }
};
export default function Login() {
  // const { socket } = useChattyContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      {!isSubmitting ? (
        <Form className="text" method="post">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <BoxStyled sx={{ "& > :not(style)": { m: 1 } }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <Input
                    autoComplete="false"
                    id="email"
                    type="email"
                    name="email"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  autoComplete="false"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </BoxStyled>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                type="submit"
              >
                Login
              </Button>
              <Typography
                variant="h7"
                component={Link}
                to="/register"
                fontWeight={300}
              >
                Does not have an account?!
              </Typography>
              <Typography
                variant="h7"
                component={Link}
                to="/reset-password"
                fontWeight={300}
              >
                forget password?!
              </Typography>
            </CardActions>
          </Card>
        </Form>
      ) : (
        <div>
          <img src={loader} alt="loader" width={400} height={400} />
        </div>
      )}
    </>
  );
}
