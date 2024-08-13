import { FormControlLabel, TextField } from "@mui/material";


interface LabeledInputProps {
    label: string;
    placeholder: string;
    type?: string;
    initialValue?: string;
    width?: string;
    required?: boolean;
    readonly?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({
    label,
    placeholder,
    required = false,
    type = "text",
    width = "100%",
    readonly = false,
    initialValue = undefined,
    onChange
}: LabeledInputProps): JSX.Element => {
    return (
        <FormControlLabel
            control={
                <TextField
                    type={type}
                    variant="outlined"
                    size="small"
                    className="mt-2"
                    placeholder={placeholder}
                    fullWidth
                    value={initialValue}
                    disabled={readonly}
                    InputProps={{
                        readOnly: readonly
                    }}
                    required={required}
                    onChange={onChange}
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
                width: width
            }}
        />
    );
};
