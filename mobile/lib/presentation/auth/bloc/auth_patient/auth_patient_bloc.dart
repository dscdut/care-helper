import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_template/data/models/patient_model.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';

part 'auth_patient_event.dart';
part 'auth_patient_state.dart';

class AuthPatientBloc extends Bloc<AuthPatientEvent, AuthPatientState> {
  AuthPatientBloc({required PatientRepository patientRepository})
      : _patientRepository = patientRepository,
        super(const AuthPatientState.unknown()) {
    on<AuthPatientInfoSet>(_onSetPatientInfo);
    on<AuthPatientInfoCheck>(_onCheckPatientInfo);
  }
  final PatientRepository _patientRepository;

  void _onCheckPatientInfo(
    AuthPatientInfoCheck event,
    Emitter<AuthPatientState> emit,
  ) {
    try {
      final PatientModel? patient = _patientRepository.getPatientInfo();
      _changeAuthState(patient, emit);
    } catch (err) {
      emit(const AuthPatientState.unauthenticated());
    }
  }

  void _onSetPatientInfo(
      AuthPatientInfoSet event, Emitter<AuthPatientState> emit) {
    _changeAuthState(event.patient, emit);
  }

  void _changeAuthState(PatientModel? patient, Emitter<AuthPatientState> emit) {
    if (patient == null) {
      emit(const AuthPatientState.unauthenticated());
    } else {
      emit(AuthPatientState.authenticated(patient));
    }
  }
}
