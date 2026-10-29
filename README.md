# Turnero — atención en sede y gestión humana

Aplicación de escritorio que usaban la recepción y las áreas de gestión humana para atender a las personas que llegan a la sede: toma y llamado de turnos, entrega de desprendibles de pago y los procesos internos que vienen detrás de cada visita.

> Se distribuía con instalador para Windows y se actualizaba sola desde las [Releases](../../releases) de este repositorio.

## Qué resuelve

Turnero reúne en una sola herramienta todo el recorrido de una persona en la sede:

| Módulo | Para qué sirve |
|---|---|
| **Recepción y turnos** | Asigna turnos, los muestra en pantalla y permite llamarlos y atenderlos por puesto. |
| **Desprendibles y formas de pago** | Consulta y entrega desprendibles de nómina y registra la forma de pago de cada persona. |
| **Contratación y selección** | Apoya el flujo de selección y contratación de personal. |
| **Vacantes y publicidad** | Crea, edita y publica vacantes y piezas publicitarias en las pantallas de la sede. |
| **Ausentismos y ARL** | Registra ausentismos y novedades de ARL. |
| **Auditoría y estadísticas** | Reportes por rol, estadísticas de atención y auditoría de los procesos. |

## Cómo está hecho

- **Electron** con HTML y JavaScript, organizado por módulos según el rol del usuario.
- Consume una **API REST** propia del backend de la empresa.
- **Actualización automática** con `electron-updater`: cada versión publicada en Releases llega sola a los equipos.
- Empaquetado con **electron-builder** y **Electron Forge** (Windows, con objetivos para Linux).
- Generación de PDF en el cliente con **jsPDF**.

---

Autor: [Sebastián Guarnizo Campos](https://www.linkedin.com/in/sebastian-guarnizo-campos) · Software Architect & Tech Lead
