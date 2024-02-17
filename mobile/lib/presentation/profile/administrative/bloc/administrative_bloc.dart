import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_template/data/dtos/profile/update_administrative_request_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';

part 'administrative_event.dart';
part 'administrative_state.dart';

class AdministrativeBloc
    extends Bloc<AdministrativeEvent, AdministrativeState> {
  AdministrativeBloc() : super(AdministrativeInitial()) {
    on<AdministrativeEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
