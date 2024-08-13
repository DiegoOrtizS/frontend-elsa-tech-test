export interface AlertMessage {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "bottom";
    severity: "success" | "info" | "warning" | "error";
    message: string;
}
