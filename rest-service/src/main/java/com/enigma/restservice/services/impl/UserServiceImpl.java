package com.enigma.restservice.services.impl;

import com.enigma.restservice.entity.User;
import com.enigma.restservice.repositories.UserRepository;
import com.enigma.restservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends CommonServiceImpl<User, String> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    protected JpaRepository<User, String> getRepository() {
        return userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username Not Found : " + username + "."));
    }
}
