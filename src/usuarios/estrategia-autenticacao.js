const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Usuario = require ('./usuarios-modelo');
const {InvalidaArgumenError} = require('../erros');


function verificaUsuario(usuario){
    if(!usuario){
        throw new InvalidaArgumenError('Nao existe usuario com esse e-mail')
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if(!senhaValida){
        throw new InvalidaArgumenError('emai ou senha invalida')
    }
}

passport.use(
    new LocalStorage({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }), async (email, senha, done) =>{
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha,usuario.senhaHash);
            done(null,usuario)
        } catch (error) {
            done(error);
        }
    }
)