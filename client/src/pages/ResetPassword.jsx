import { AccountCircle } from "@material-ui/icons";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Form, useNavigation } from "react-router-dom";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import loader from "../assets/images/loader.gif";

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // fontSize: "24px"
}));
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await fetch("/api/v1/auth/resetPassword", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  if (result.ok) {
    return toast.success(response.msg);
  } else {
    return toast.error(response.msg);
  }
};

const ResetPassword = () => {
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
                  <InputLabel htmlFor="Email">
                    Enter your Email/Phone
                  </InputLabel>
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
              </BoxStyled>
            </CardContent>
            <CardActions>
              <Button size="medium" type="submit">
                Reset
              </Button>
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
};
export default ResetPassword;
