function getResponsivity(current, radiance = 0.001, area = 0.16) {
    const responsivity = current / (radiance * area);
    return responsivity;
}

function getEqeFromR(responsivity, wavelength) {
    const eqe = (1240 * responsivity) / wavelength;
    return eqe;
}

function getRFromEqe(eqe, wavelength) {
    const R = (wavelength * eqe) / 1240;
    return R;
}

function getEqeFromData(current, V, wavelength, radiance = 0.001, area = 0.16) {
    const R = getResponsivity(current, radiance, area);
    return getEqeFromR(R, wavelength);
}