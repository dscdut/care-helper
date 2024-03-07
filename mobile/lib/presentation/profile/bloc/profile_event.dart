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

class GetPatientInfoEvent extends ProfileEvent {
  // const GetPatientInfoEvent();
}

class UpdatePatientInfoEvent extends ProfileEvent {
  const UpdatePatientInfoEvent(this.params);

  final UpdatePatientRequestDTO params;

  // @override
  // List<Object> get props => [params];
}
