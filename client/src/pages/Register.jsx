import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import styled from "@emotion/styled";
const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
export default function Registration() {
  return (
    <div className="text">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <BoxStyled sx={{ "& > :not(style)": { m: 1 } }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="Email">Email</InputLabel>
              <Input
                id="email"
                type="email"
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
          <Button size="small">Register</Button>
        </CardActions>
      </Card>
    </div>
  );
}
