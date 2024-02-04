import { Module } from 'packages/handler/Module';
import { keyword, page, size } from 'core/common/swagger';
import { DrugController } from './drug.controller';

export const DrugResolver = Module.builder()
    .addPrefix({
        prefixPath: '/drugs',
        tag: 'drugs',
        module: 'DrugModule',
    })
    .register([
        {
            route: '',
            method: 'get',
            params: [keyword, page, size],
            controller: DrugController.getPaginationDrugs,
            model: {
                type: 'array',
                name: 'string',
            },
            preAuthorization: true,
        },
        {
            route: '/list-name',
            method: 'get',
            params: [keyword],
            controller: DrugController.listDrugsName,
            model: {
                type: 'array',
                name: 'string',
            },
            preAuthorization: true,
        },
    ]);
