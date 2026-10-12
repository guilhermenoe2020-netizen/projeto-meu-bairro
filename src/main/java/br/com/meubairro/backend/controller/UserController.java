
package br.com.meubairro.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.meubairro.backend.dto.LoginRequest;
import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


@PostMapping("/register")
@ResponseStatus(HttpStatus.CREATED)
public java.util.Map<String, Object> cadastrar(@RequestBody User user) {
    User usuarioSalvo = userService.cadastrar(user);

    return java.util.Map.of(
        "id", usuarioSalvo.getId(),
        "nome", usuarioSalvo.getNome(),
        "email", usuarioSalvo.getEmail()
    );
}


@PostMapping("/login")
public java.util.Map<String, Object> login(
        @RequestBody LoginRequest request) {

    User user = userService.login(
        request.getEmail(),
        request.getSenha()
    );

    return java.util.Map.of(
        "id", user.getId(),
        "nome", user.getNome(),
        "email", user.getEmail()
    );
}


}
