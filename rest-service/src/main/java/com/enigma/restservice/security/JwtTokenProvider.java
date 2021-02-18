package com.enigma.restservice.security;

import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider implements Serializable {

    @Autowired
    private JwtProperties jwtProperties;

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSigningKey())
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(Authentication authentication) {
        String authorties = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(jwtProperties.getAuthoritiesKey(), authorties)
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSigningKey())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getValidityMillis() * 1000))
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername())
                && !isTokenExpired(token));
    }

    UsernamePasswordAuthenticationToken getAuthentication( String token,  UserDetails userDetails) {
        JwtParser jwtParser = Jwts.parser().setSigningKey(jwtProperties.getSigningKey());
        Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        Collection<? extends GrantedAuthority> authorities
                = Arrays.stream(claims.get(jwtProperties.getAuthoritiesKey()).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(userDetails,"", authorities);
    }
}
