import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { redirect, useNavigation } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Form, Link } from "react-router-dom";
import loader from "../assets/images/loader.gif";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // const result = await axios.post("/api/v1/auth/register", data);
  const result = await fetch("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  if (result.ok) {
    localStorage.setItem("user", data.email);
    toast.success(response.msg);
    return redirect("/register/avatar");
  } else {
    return toast.error(response.msg);
  }
};
const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
export default function Registration() {
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
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="false"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
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
                <TextField
                  id="confirm-password"
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
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
              <Button size="medium" type="submit" disabled={isSubmitting}>
                Register
              </Button>
              <Typography
                variant="h7"
                component={Link}
                to="/login"
                fontWeight={300}
              >
                Have an account?!
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
