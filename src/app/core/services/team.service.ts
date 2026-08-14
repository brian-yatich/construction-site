import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TeamMember } from '../models';
import { TEAM_MOCK } from '../mock/team.mock';

const SIMULATED_LATENCY = 250;

@Injectable({ providedIn: 'root' })
export class TeamService {
  getAll(): Observable<TeamMember[]> {
    return of(TEAM_MOCK).pipe(delay(SIMULATED_LATENCY));
  }
}
