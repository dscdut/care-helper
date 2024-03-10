import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_template/data/dtos/profile/update_medical_history_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_request_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';

part 'profile_event.dart';
part 'profile_state.dart';

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  ProfileBloc({required PatientRepository patientRepository})
      : _patientRepository = patientRepository,
        super(const ProfileState()) {
    on<SegmentedControlTabChange>(_onControlTabChange);
    on<GetPatientInfoEvent>(_onGetPatientInfo);
    on<UpdatePatientInfoEvent>(_onUpdatePatientInfo);
    on<GetMedicalHistoryEvent>(_onGetMedicalHistory);
    add(GetPatientInfoEvent());
  }
  void _onControlTabChange(
    SegmentedControlTabChange event,
    Emitter<ProfileState> emit,
  ) {
    if (event.newIndex == state.currentIndex) return;
    emit(state.copyWith(currentIndex: event.newIndex));
  }

  final PatientRepository _patientRepository;

  _onGetPatientInfo(
    GetPatientInfoEvent event,
    Emitter<ProfileState> emit,
  ) {
    // emit(state.copyWith(isLoading: true));
    try {
      final PatientModel? patient = _patientRepository.getPatientInfo();
      emit(state.copyWith(isLoading: false, patient: patient));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onUpdatePatientInfo(
    UpdatePatientInfoEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      final PatientModel patient =
          await _patientRepository.updatePatientInfo(event.params);
      emit(state.copyWith(patient: patient));
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }

  Future<void> _onGetMedicalHistory(
    GetMedicalHistoryEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      final String history =
          await _patientRepository.getMedicalHistory(event.id);
      emit(state.copyWith(history: history));
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
}
