// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * TrazabilidadAgricola_IR - CultivaTech ColombIA
 * ---------------------------------------------
 * Permite registrar lecturas de sensores (Temperatura, Humedad) con un hash SHA-256
 * generado en el borde (Edge Computing) por el ESP32.
 */
contract TrazabilidadAgricola_IR {
    address public owner;

    struct Lectura {
        uint256 timestamp;
        int256 temperatura;
        uint256 humedad;
        bytes32 hashDato; // Hash SHA-256 inyectado por el dispositivo
    }

    mapping(address => bool) public authorizedSensors;
    mapping(bytes32 => bool) public raicesAncladas;
    Lectura[] public historial;
    uint256 public totalRaices;

    event NuevaLectura(uint256 indexed id, bytes32 indexed hashDato, address sensor);

    // Evento para anclaje de raíz en lote
    event RaizAnclada(bytes32 indexed raizBatch, uint256 timestamp, address sensor);

    // Evento con todos los hashes del lote (modo bytes32[])
    event HashesLote(bytes32 indexed raizBatch, bytes32[] hashes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: No eres el administrador de IR Productions.");
        _;
    }

    modifier onlyAuthorizedSensor() {
        require(authorizedSensors[msg.sender] || msg.sender == owner, "Error: Sensor no autorizado en la red.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Autoriza una dirección pública (wallet/sensor) para registrar datos.
     */
    function autorizarSensor(address _sensor) public onlyOwner {
        authorizedSensors[_sensor] = true;
    }

    /**
     * @dev Registra los datos del sensor validados por su firma digital.
     */
    function registrarLectura(int256 _temp, uint256 _hum, bytes32 _hashDato) public onlyAuthorizedSensor {
        historial.push(Lectura(block.timestamp, _temp, _hum, _hashDato));
        emit NuevaLectura(historial.length - 1, _hashDato, msg.sender);
    }

    /**
     * @dev Registra la raíz criptográfica de un lote de lecturas.
     * La raíz se calcula fuera de la cadena (oráculo) para minimizar gas.
     */
    function registrarRaizBatch(bytes32 _raizBatch) public onlyAuthorizedSensor {
        _anclarRaiz(_raizBatch, new bytes32[](0));
    }

    /**
     * @dev Registra todos los hashes del lote. La raíz Merkle se calcula en cadena
     * con keccak256(abi.encodePacked(izquierda, derecha)) y duplicando el último
     * nodo cuando la capa tiene longitud impar.
     */
    function registrarHashesBatch(bytes32[] calldata _hashes) external onlyAuthorizedSensor {
        bytes32 raiz = _calcularRaizMerkle(_hashes);
        _anclarRaiz(raiz, _hashes);
    }

    function _anclarRaiz(bytes32 _raizBatch, bytes32[] memory _hashes) internal {
        require(_raizBatch != bytes32(0), "Error: raiz vacia.");
        require(!raicesAncladas[_raizBatch], "Error: raiz ya anclada.");

        raicesAncladas[_raizBatch] = true;
        totalRaices += 1;

        emit RaizAnclada(_raizBatch, block.timestamp, msg.sender);

        if (_hashes.length > 0) {
            emit HashesLote(_raizBatch, _hashes);
        }
    }

    function _calcularRaizMerkle(bytes32[] memory _hashes) internal pure returns (bytes32) {
        require(_hashes.length > 0, "Error: lote vacio.");

        bytes32[] memory capa = _hashes;

        while (capa.length > 1) {
            uint256 siguienteLongitud = (capa.length + 1) / 2;
            bytes32[] memory siguiente = new bytes32[](siguienteLongitud);

            for (uint256 i = 0; i < capa.length; i += 2) {
                bytes32 izquierda = capa[i];
                bytes32 derecha = (i + 1 < capa.length) ? capa[i + 1] : capa[i];
                siguiente[i / 2] = keccak256(abi.encodePacked(izquierda, derecha));
            }

            capa = siguiente;
        }

        return capa[0];
    }

    /**
     * @dev Devuelve el número total de lecturas registradas.
     */
    function totalLecturas() public view returns (uint256) {
        return historial.length;
    }
}
