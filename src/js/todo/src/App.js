import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box>
          <Typography variant="h3">todo</Typography>
          <TextField
            label="what's on your mind"
            variant="outlined"
            helperText="press '/' to focus"
            sx={{ width: "100%" }}
          />
          <Card>
            <CardContent>
              <TextField
                variant="outlined"
                helperText="Jan, 20, 2024"
                sx={{ width: "100%" }}
              />
            </CardContent>
            <CardActions>
              <Button size="small" color="success">
                Done
              </Button>
              <Button size="small" color="error">
                Delete
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default App;
