package net.javaguides.st.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    //this particular exception is thrown when lift ID is not found
    public ResourceNotFoundException(String message){
        super(message);
    }
}
