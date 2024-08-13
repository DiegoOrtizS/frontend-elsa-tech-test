import { Paper, Typography } from "@mui/material";


interface UserBannerProps {
    name: string;
}

export const UserBanner = ({ name }: UserBannerProps): JSX.Element => {
    return (
        <Paper elevation={3} className="p-6">
            <Typography
                variant="h5"
                component="div"
                className="font-bold"
                color="primary"
            >
                ¡Bienvenido/a al Albergue {name}!
            </Typography>
            <Typography variant="body1" component="p">
                Por favor, selecciona con que modulo vamos a empezar a trabajar.
            </Typography>
        </Paper>
    );
};
