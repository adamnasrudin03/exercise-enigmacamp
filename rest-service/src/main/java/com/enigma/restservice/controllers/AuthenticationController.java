package com.enigma.restservice.controllers;

import com.enigma.restservice.models.AuthenticationRequest;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.security.JwtTokenProvider;
import com.enigma.restservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import ch.qos.logback.classic.Logger;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/signin")
    public ResponseMessage signIn(@RequestBody AuthenticationRequest data) {

        try {
            String username = data.getUsername();
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.generateToken(authentication);

            System.out.println("username & token  : " + username + " ," + token);
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            System.out.println("model : " + model);
            return ResponseMessage.succses(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid is Username or Password supplied");
        }
    }

    @GetMapping("/test")
    public String test(@RequestParam String data) {
        return encoder.encode(data);
    }

}
