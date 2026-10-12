
package br.com.meubairro.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User cadastrar(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Este e-mail já está cadastrado."
            );
        }

        user.setSenha(passwordEncoder.encode(user.getSenha()));

        return userRepository.save(user);
    }
    

    public User login(String email, String senha) {

     User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.UNAUTHORIZED,
            "E-mail ou senha inválidos."
        ));

     if (!passwordEncoder.matches(senha, user.getSenha())) {
        throw new ResponseStatusException(
            HttpStatus.UNAUTHORIZED,
            "E-mail ou senha inválidos."
        );
    }

    return user;
}

}
