import { Module } from 'packages/handler/Module';
import { keyword, page, size } from 'core/common/swagger';
import { HospitalController } from './hospital.controller';

export const HospitalResolver = Module.builder()
    .addPrefix({
        prefixPath: '/hospitals',
        tag: 'hospitals',
        module: 'HospitalModule',
    })
    .register([
        {
            route: '',
            method: 'get',
            params: [page,size],
            controller: HospitalController.getAllHospitals,
            model: {
                type: 'array',
                name: 'HospitalDto',
            },
            preAuthorization: false,
        },
        {
            route: '/list-name',
            method: 'get',
            params: [keyword],
            controller: HospitalController.listHospitalName,
            model: {
                type: 'array',
                name: 'SearchDto',
            },
            preAuthorization: false,
        },
    ]);
