part of 'profile_bloc.dart';

abstract class ProfileEvent extends Equatable {
  const ProfileEvent();

  @override
  List<Object> get props => [];
}

class SegmentedControlTabChange extends ProfileEvent {
  const SegmentedControlTabChange({required this.newIndex});

  final int newIndex;

  @override
  List<Object> get props => [newIndex];
}

class GetPatientInfoEvent extends ProfileEvent {}

class UpdatePatientInfoEvent extends ProfileEvent {
  const UpdatePatientInfoEvent(this.params);

  final UpdatePatientRequestDTO params;
}

class GetMedicalHistoryEvent extends ProfileEvent {
  const GetMedicalHistoryEvent(this.id);

  final int id;
}

class PostMedicalHistoryEvent extends ProfileEvent {
  const PostMedicalHistoryEvent(this.param);

  final UpdateMedicalHistoryRequestDTO param;
}

class UpdateMedicalHistoryEvent extends ProfileEvent {
  const UpdateMedicalHistoryEvent(this.param);

  final UpdateMedicalHistoryRequestDTO param;
}
