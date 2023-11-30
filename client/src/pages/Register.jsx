import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";

import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Form, Link } from "react-router-dom";
import styled from "@emotion/styled";
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
    console.log(response);
  } else {
    console.log(response);
  }
  return null;
};
const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
export default function Registration() {
  return (
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
              name="confirm-password"
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
          <Button size="medium" type="submit">
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
  );
}