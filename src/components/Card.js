import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { BACKEND_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";

const MuiCard = ({ id, name, price, description, img }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={id}
      sx={{ maxWidth: 250, margin: "10px" }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={BACKEND_URL + img}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="truncate"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="truncate"
          >
            {description}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            className="green-text"
          >
            $ {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default MuiCard;
