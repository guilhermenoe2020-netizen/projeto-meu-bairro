# Meu Bairro

## Acesso e limitações do projeto

**Site:** https://meu-bairro.netlify.app

### Onde o projeto está hospedado

- **Frontend:** Netlify — onde o site fica disponível para acesso.
- **Backend:** Render — responsável pela API que atende às requisições do frontend.
- **Banco de dados:** MySQL hospedado na Aiven — utilizado para armazenar os dados.

### Limitações atuais

O projeto ainda está em desenvolvimento, por isso algumas funcionalidades podem estar incompletas ou apresentar falhas.

- A disponibilidade do site depende também do funcionamento do backend e do banco de dados.
- O primeiro acesso à API pode demorar quando o serviço hospedado precisa ser iniciado novamente.
- A integração entre as telas e a API ainda precisa ser testada e aprimorada.
- Algumas funcionalidades e validações ainda precisam ser implementadas conforme o projeto evoluir.

Se encontrar algum problema ao acessar o site ou utilizar uma funcionalidade, compartilhe o que aconteceu e, se possível, uma captura de tela.

### Próximas melhorias

Podemos continuar aprimorando as telas, a experiência de uso, a integração entre frontend e backend e a confiabilidade das funcionalidades.

---

## Como está o projeto

Até agora, já temos:

- **Frontend:** telas desenvolvidas com HTML, CSS e JavaScript.
- **Backend:** estrutura inicial da API com Java e Spring Boot.
- **Banco de dados:** MySQL.
- **Integração:** início da comunicação entre o frontend e a API.
- **GitHub:** para guardar o código e acompanhar as mudanças.
- 
## Como baixar o projeto

Você precisa ter o Git instalado. Depois, abra o terminal na pasta onde deseja guardar o projeto e execute:

```bash
git clone https://github.com/guilhermenoe2020-netizen/projeto-meu-bairro.git
cd projeto-meu-bairro
```

Pronto! Agora você tem uma cópia do projeto no seu computador.

Para atualizar sua cópia com as mudanças mais recentes, entre na pasta do projeto e execute:

```bash
git pull origin main
```

## Como compartilhar suas alterações

Se quiser contribuir, você pode fazer alterações na sua cópia do projeto e compartilhar o resultado.

Para registrar suas mudanças, use:

```bash
git add .
git commit -m "descreva o que foi alterado"
git push
```
## Como compartilhar suas melhorias

Se você fez alguma alteração no frontend e quer compartilhar, pode criar um repositório na sua própria conta do GitHub e enviar os arquivos modificados para lá.

### 1. Crie um repositório

Crie um repositório na sua conta e copie a URL dele.

### 2. Envie os arquivos

Abra o terminal na pasta do projeto que você alterou e execute os comandos abaixo:

```bash
git init
git add .
git commit -m "melhora o frontend"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Substitua `URL_DO_SEU_REPOSITORIO` pela URL do repositório que você criou.

Se o projeto já estiver usando Git, não precisa executar `git init` novamente.

### 3. Compartilhar

Pronto! Depois que os arquivos forem enviados, copie o link do seu repositório no GitHub e envie no grupo.
