import React, { Component, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

interface Data {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  foto: string;
  audio: string;
}

interface Form {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  foto: string;
  audio: string;
}

interface AppState {
  data: Data[];
  modalActualizar: boolean;
  modalInsertar: boolean;
  form: Form;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    data: [
      { id: 1, titulo: "titulo 1", fecha: "12/12/2023", descripcion: "descripcion 1", foto: "foto 1", audio: "audio 1" },
      { id: 2, titulo: "titulo 2", fecha: "12/12/2023", descripcion: "descripcion 2", foto: "foto 2", audio: "audio 2" },
      { id: 3, titulo: "titulo 3", fecha: "12/12/2023", descripcion: "descripcion 3", foto: "foto 3", audio: "audio 3" },
      { id: 4, titulo: "titulo 4", fecha: "12/12/2023", descripcion: "descripcion 4", foto: "foto 4", audio: "audio 4" },
      { id: 5, titulo: "titulo 5", fecha: "12/12/2023", descripcion: "descripcion 5", foto: "foto 5", audio: "audio 5" },
    ],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      titulo: "",
      fecha: "",
      descripcion: "",
      foto: "",
      audio: "",
    },
  };

  mostrarModalActualizar = (dato: Data) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato: Data) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].titulo = dato.titulo;
        arreglo[contador].fecha = dato.fecha;
        arreglo[contador].descripcion = dato.descripcion;
        arreglo[contador].foto = dato.foto;
        arreglo[contador].audio = dato.audio;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato: Data) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=(this.state.data.length+1).toString();
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Fecha</th>
                <th>Descripcion</th>
                <th>Foto</th>
                <th>Audio</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.titulo}</td>
                  <td>{dato.fecha}</td>
                  <td>{dato.descripcion}</td>
                  <td>{dato.foto}</td>
                  <td>{dato.audio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Titulo: 
              </label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.titulo}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input
                className="form-control"
                name="fecha"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripcion: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Foto: 
              </label>
              <input
                className="form-control"
                name="foto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.foto}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Audio: 
              </label>
              <input
                className="form-control"
                name="Audio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.audio}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Instertar Vivencias</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={(this.state.data.length+1).toString()}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Titulo: 
              </label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input
                className="form-control"
                name="fecha"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripcion: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Foto: 
              </label>
              <input
                className="form-control"
                name="foto"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Audio: 
              </label>
              <input
                className="form-control"
                name="audio"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
