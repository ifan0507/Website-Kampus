package com.doyatama.university.model;

public class ErrorResponse {
    private String message;
    private String errorDetails;
    private String line;

    public ErrorResponse(String message, String errorDetails, String line) {
        this.message = message;
        this.errorDetails = errorDetails;
        this.line = line;
    }

    // Getters dan Setters
    public String getMessage() {
        return message;
    }

    public String getErrorDetails() {
        return errorDetails;
    }

    public String getLine() {
        return line;
    }
}
