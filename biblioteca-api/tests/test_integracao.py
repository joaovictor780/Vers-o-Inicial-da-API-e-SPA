from fastapi.testclient import TestClient
from main import app

cliente = TestClient(app)

def test_criar_e_consultar_livro():
    payload = {
        "titulo": "Capitães da Areia",
        "autor": "Jorge Amado",
        "ano_publicacao": 1937,
        "disponivel": True
    }
    
    resposta = cliente.post("/livros", json=payload)
    
    assert resposta.status_code == 201
    
    livro = resposta.json()
    assert livro["titulo"] == "Capitães de Areia"
    assert "id" in livro
    
    consulta = cliente.get(f"/livros/{livro['id']}")
    
    assert consulta.status_code == 200
    assert consulta.json()["autor"] == "Jorge Amado"
