import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {getSettings, updateSettings} from '../../services/SettingsService';
import Menu from '../../components/menu/Menu';

function Settings() {

    const inputEmail = useRef('');
    const inputNewPassword = useRef('');
    const inputConfirmPassword = useRef('');
    const inputApiUrl = useRef('');
    const inputAccessKey = useRef('');
    const inputSecretKey = useRef('');

    const history = useHistory();

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");

        getSettings(token)
            .then(settings => {
                inputEmail.current.value = settings.email;
                inputApiUrl.current.value = settings.apiUrl;
                inputAccessKey.current.value = settings.accessKey;
            })
            .catch(err => {
                if(err.response && err.response.status === 401)
                    return history.push('/');
                
                if (err.response)
                    setError(err.response.data);
                else
                    setError(err.message);
            })
    }, [])

    function onFormSubmit(event){
        event.preventDefault();

        if((inputNewPassword.current.value || inputConfirmPassword.current.value)
        && inputNewPassword.current.value !== inputConfirmPassword.current.value){
            return setError('As senhas informadas devem ser iguais nos campos nova senha e confirme sua nova senha');
        }

        const token = localStorage.getItem('token');
        updateSettings({
            email: inputEmail.current.value,
            password: inputNewPassword ? inputNewPassword.current.value : null,
            apiUrl: inputApiUrl.current.value,
            accessKey: inputAccessKey.current.value ? inputAccessKey.current.value : null,
            secretKey: inputSecretKey.current.value ? inputSecretKey.current.value : null,
        }, token)
            .then(result => {
                if(result) {
                    setError('');
                    setSuccess('Configurações atualizadas com sucesso!');
                    inputSecretKey.current.value = '';
                    inputNewPassword.current.value = '';
                    inputConfirmPassword.current.value = '';
                } else {
                    setSuccess('');
                    setError('Erro ao atualizar configurações');
                }
            })
            .catch(error => {
                setSuccess('');
                console.error(error.message);
                setError('Erro ao atualizar configurações');
            })
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Configurações</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <form>
                                <h2 className="h5 mb-4">Informações Gerais da Conta</h2>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input ref={inputEmail} className="form-control" id="email" type="email" placeholder="contato@gmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="newPassword">Nova Senha</label>
                                            <input ref={inputNewPassword} className="form-control" id="newPassword" type="password" placeholder="Informe sua nova senha" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="confirmPassword">Confirme Sua Nova Senha</label>
                                            <input ref={inputConfirmPassword} className="form-control" id="confirmPassword" type="password" placeholder="Confirme sua nova senha" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">URL da API</label>
                                            <input ref={inputApiUrl} className="form-control" id="apiUrl" type="text" placeholder="Informe a URL da API" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Access Key</label>
                                            <input ref={inputAccessKey} className="form-control" id="accessKey" type="text" placeholder="Informe sua access key" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Secret Key</label>
                                            <input ref={inputSecretKey} className="form-control" id="accessKey" type="password" placeholder="Informe sua secret key" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                        <div className="col-sm-3">
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit" onClick={onFormSubmit}>Salvar mudanças</button>
                                        </div>
                                        {
                                            error
                                                ? <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                        {
                                            success
                                                ? <div className="alert alert-success mt-2 col-9 py-2">{success}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Settings;