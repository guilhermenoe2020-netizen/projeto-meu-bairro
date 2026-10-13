
package br.com.meubairro.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.meubairro.backend.dto.LoginRequest;
import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.service.UserService;
import br.com.meubairro.backend.service.TokenService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;

    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> cadastrar(@RequestBody User user) {
        User usuarioSalvo = userService.cadastrar(user);

        return Map.of(
            "id", usuarioSalvo.getId(),
            "nome", usuarioSalvo.getNome(),
            "email", usuarioSalvo.getEmail()
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        User user = userService.login(
            request.getEmail(),
            request.getSenha()
        );

        String token = tokenService.gerarToken(user.getEmail());

        return Map.of(
            "id", user.getId(),
            "nome", user.getNome(),
            "email", user.getEmail(),
            "token", token
        );
    }
}
