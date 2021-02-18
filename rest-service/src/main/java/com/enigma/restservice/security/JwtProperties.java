package com.enigma.restservice.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String authoritiesKey = "scopes";
    private String signingKey = "secret";
    private  long validityMillis = 3600000;

    public String getAuthoritiesKey() {
        return authoritiesKey;
    }

    public void setAuthoritiesKey(String authoritiesKey) {
        this.authoritiesKey = authoritiesKey;
    }

    public String getSigningKey() {
        return signingKey;
    }

    public void setSigningKey(String signingKey) {
        this.signingKey = signingKey;
    }

    public Long getValidityMillis() {
        return validityMillis;
    }

    public void setValidityMillis(long validityMillis) {
        this.validityMillis = validityMillis;
    }
}
