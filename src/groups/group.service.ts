import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { Group } from './dto/createGroup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as escapeHTML from 'escape-html';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // Function that creates new group
  async createGroup(providedGroupObject: Group) {
    try {
      // Escape HTML in user provided data
      const membersArray: string[] = [];
      providedGroupObject.members.forEach((member) =>
        membersArray.push(escapeHTML(member)),
      );
      const title = escapeHTML(providedGroupObject.title);
      const description = escapeHTML(providedGroupObject.description);
      const author = this.request.userEmail;
      // Create new object from cleaned data
      const newGroupObject = {
        title: title,
        description: description,
        members: membersArray,
        author: author,
      };
      // Create new group
      const newGroup = new this.groupModel(newGroupObject);
      if (!newGroup) {
        throw new HttpException('Cant create new group!', 500);
      }
      const creationResult = await newGroup.save();
      // Check if group has been created and return error if not
      const createdGroupObjectToReturn: object = {
        Message: 'Group successfully created!',
        GroupObject: creationResult['_doc'],
      };
      if (!creationResult) {
        throw new HttpException(
          'Something went wrong when creating Group!',
          500,
        );
      }
      return createdGroupObjectToReturn;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong when creating new group!',
        500,
      );
    }
  }

  // Get all user groups
  async getUserGroups() {
    try {
      const user = this.request.userEmail;
      // Get groups which has user as a member
      const groups = await this.groupModel.find({ members: { $in: user } });
      if (!groups) {
        throw new HttpException('Cant find any groups!', 400);
      }
      return groups;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong when fetching groups', 500);
    }
  }

  // Get single group
  async getSingleGroup(groupId: any) {
    try {
      const groupID = escapeHTML(groupId.groupId);
      // Get group from db
      const fetchedGroup = await this.groupModel.findById(groupID);
      if (!fetchedGroup) {
        throw new HttpException('Cant get group', 400);
      }
      return fetchedGroup;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong while fetching single group',
        500,
      );
    }
  }
}
