import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlLabel, TextField } from "@mui/material";
import { useRef, useState } from "react";

interface State {
    showPassword: boolean;
}

interface PasswordProps {
    label?: string;
    placeholder: string;
    modifyPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPasswordReveal = ({
    label = undefined,
    placeholder,
    modifyPassword
}: PasswordProps): JSX.Element => {
    const [values, setValues] = useState<State>({
        showPassword: false
    });
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickShowPassword = (): void => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });

        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ): void => {
        event.preventDefault();
    };

    return (
        <FormControlLabel
            control={
                <TextField
                    label={label ? "" : placeholder}
                    placeholder={label ? placeholder : ""}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="normal"
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    required={true}
                    onChange={modifyPassword}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            }
            label={label}
            labelPlacement="top"
            sx={{
                "& .MuiStack-root" : {
                    width: "100%",
                    "& .MuiFormControlLabel-label": {
                        textAlign: "left !important",
                        width: "100% !important",
                        fontWeight: "600"
                    },
                },
                ".MuiFormControlLabel-asterisk": {
                    display: "none"
                },
                margin: "0 !important",
                width: "100%"
            }}
        />
    );
};
