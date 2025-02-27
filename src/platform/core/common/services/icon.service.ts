/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';

@Injectable()
export class IconService {
  private _icons: string[] = [
    'access_alarm',
    'access_alarms',
    'access_time',
    'accessibility',
    'account_balance',
    'account_balance_wallet',
    'account_box',
    'account_circle',
    'add',
    'add_alarm',
    'add_box',
    'add_circle',
    'add_circle_outline',
    'add_shopping_cart',
    'add_to_photos',
    'adjust',
    'alarm',
    'alarm_add',
    'alarm_off',
    'alarm_on',
    'album',
    'android',
    'announcement',
    'apps',
    'archive',
    'arrow_back',
    'arrow_drop_down',
    'arrow_drop_down_circle',
    'arrow_drop_up',
    'arrow_forward',
    'aspect_ratio',
    'assessment',
    'assignment',
    'assignment_ind',
    'assignment_late',
    'assignment_return',
    'assignment_returned',
    'assignment_turned_in',
    'assistant_photo',
    'attach_file',
    'attach_money',
    'attachment',
    'audiotrack',
    'autorenew',
    'av_timer',
    'backspace',
    'backup',
    'battery_alert',
    'battery_charging_full',
    'battery_full',
    'battery_std',
    'battery_unknown',
    'beenhere',
    'block',
    'bluetooth',
    'bluetooth_audio',
    'bluetooth_connected',
    'bluetooth_disabled',
    'bluetooth_searching',
    'blur_circular',
    'blur_linear',
    'blur_off',
    'blur_on',
    'book',
    'bookmark',
    'bookmark_border',
    'border_all',
    'border_bottom',
    'border_clear',
    'border_color',
    'border_horizontal',
    'border_inner',
    'border_left',
    'border_outer',
    'border_right',
    'border_style',
    'border_top',
    'border_vertical',
    'brightness_1',
    'brightness_2',
    'brightness_3',
    'brightness_4',
    'brightness_5',
    'brightness_6',
    'brightness_7',
    'brightness_auto',
    'brightness_high',
    'brightness_low',
    'brightness_medium',
    'broken_image',
    'brush',
    'bug_report',
    'build',
    'business',
    'cached',
    'cake',
    'call',
    'call_end',
    'call_made',
    'call_merge',
    'call_missed',
    'call_received',
    'call_split',
    'camera',
    'camera_alt',
    'camera_front',
    'camera_rear',
    'camera_roll',
    'cancel',
    'cast',
    'cast_connected',
    'center_focus_strong',
    'center_focus_weak',
    'chat',
    'check',
    'check_box',
    'check_box_outline_blank',
    'check_circle',
    'chevron_left',
    'chevron_right',
    'class',
    'clear',
    'clear_all',
    'close',
    'closed_caption',
    'cloud',
    'cloud_circle',
    'cloud_done',
    'cloud_download',
    'cloud_off',
    'cloud_queue',
    'cloud_upload',
    'collections',
    'collections_bookmark',
    'color_lens',
    'colorize',
    'comment',
    'compare',
    'computer',
    'confirmation_number',
    'contact_phone',
    'contacts',
    'content_copy',
    'content_cut',
    'content_paste',
    'control_point',
    'control_point_duplicate',
    'create',
    'credit_card',
    'crop',
    'crop_16_9',
    'crop_3_2',
    'crop_5_4',
    'crop_7_5',
    'crop_din',
    'crop_free',
    'crop_landscape',
    'crop_original',
    'crop_portrait',
    'crop_square',
    'dashboard',
    'data_usage',
    'dehaze',
    'delete',
    'description',
    'desktop_mac',
    'desktop_windows',
    'details',
    'developer_board',
    'developer_mode',
    'device_hub',
    'devices',
    'dialer_sip',
    'dialpad',
    'directions',
    'directions_bike',
    'directions_boat',
    'directions_bus',
    'directions_car',
    'directions_railway',
    'directions_run',
    'directions_subway',
    'directions_transit',
    'directions_walk',
    'disc_full',
    'dns',
    'do_not_disturb',
    'do_not_disturb_alt',
    'dock',
    'domain',
    'done',
    'done_all',
    'drafts',
    'drive_eta',
    'dvr',
    'edit',
    'eject',
    'email',
    'equalizer',
    'error',
    'error_outline',
    'event',
    'event_available',
    'event_busy',
    'event_note',
    'event_seat',
    'exit_to_app',
    'expand_less',
    'expand_more',
    'explicit',
    'explore',
    'exposure',
    'exposure_neg_1',
    'exposure_neg_2',
    'exposure_plus_1',
    'exposure_plus_2',
    'exposure_zero',
    'extension',
    'face',
    'fast_forward',
    'fast_rewind',
    'favorite',
    'favorite_border',
    'feedback',
    'file_download',
    'file_upload',
    'filter',
    'filter_1',
    'filter_2',
    'filter_3',
    'filter_4',
    'filter_5',
    'filter_6',
    'filter_7',
    'filter_8',
    'filter_9',
    'filter_9_plus',
    'filter_b_and_w',
    'filter_center_focus',
    'filter_drama',
    'filter_frames',
    'filter_hdr',
    'filter_list',
    'filter_none',
    'filter_tilt_shift',
    'filter_vintage',
    'find_in_page',
    'find_replace',
    'flag',
    'flare',
    'flash_auto',
    'flash_off',
    'flash_on',
    'flight',
    'flight_land',
    'flight_takeoff',
    'flip',
    'flip_to_back',
    'flip_to_front',
    'folder',
    'folder_open',
    'folder_shared',
    'folder_special',
    'font_download',
    'format_align_center',
    'format_align_justify',
    'format_align_left',
    'format_align_right',
    'format_bold',
    'format_clear',
    'format_color_fill',
    'format_color_reset',
    'format_color_text',
    'format_indent_decrease',
    'format_indent_increase',
    'format_italic',
    'format_line_spacing',
    'format_list_bulleted',
    'format_list_numbered',
    'format_paint',
    'format_quote',
    'format_size',
    'format_strikethrough',
    'format_textdirection_l_to_r',
    'format_textdirection_r_to_l',
    'format_underlined',
    'forum',
    'forward',
    'forward_10',
    'forward_30',
    'forward_5',
    'fullscreen',
    'fullscreen_exit',
    'functions',
    'gamepad',
    'games',
    'gesture',
    'get_app',
    'gif',
    'gps_fixed',
    'gps_not_fixed',
    'gps_off',
    'grade',
    'gradient',
    'grain',
    'graphic_eq',
    'grid_off',
    'grid_on',
    'group',
    'group_add',
    'group_work',
    'hd',
    'hdr_off',
    'hdr_on',
    'hdr_strong',
    'hdr_weak',
    'headset',
    'headset_mic',
    'healing',
    'hearing',
    'help',
    'help_outline',
    'high_quality',
    'highlight_off',
    'history',
    'home',
    'hotel',
    'hourglass_empty',
    'hourglass_full',
    'http',
    'https',
    'image',
    'image_aspect_ratio',
    'import_export',
    'inbox',
    'indeterminate_check_box',
    'info',
    'info_outline',
    'input',
    'insert_chart',
    'insert_comment',
    'insert_drive_file',
    'insert_emoticon',
    'insert_invitation',
    'insert_link',
    'insert_photo',
    'invert_colors',
    'invert_colors_off',
    'iso',
    'keyboard',
    'keyboard_arrow_down',
    'keyboard_arrow_left',
    'keyboard_arrow_right',
    'keyboard_arrow_up',
    'keyboard_backspace',
    'keyboard_capslock',
    'keyboard_hide',
    'keyboard_return',
    'keyboard_tab',
    'keyboard_voice',
    'label',
    'label_outline',
    'landscape',
    'language',
    'laptop',
    'laptop_chromebook',
    'laptop_mac',
    'laptop_windows',
    'launch',
    'layers',
    'layers_clear',
    'leak_add',
    'leak_remove',
    'lens',
    'library_add',
    'library_books',
    'library_music',
    'link',
    'list',
    'live_help',
    'live_tv',
    'local_activity',
    'local_airport',
    'local_atm',
    'local_bar',
    'local_cafe',
    'local_car_wash',
    'local_convenience_store',
    'local_dining',
    'local_drink',
    'local_florist',
    'local_gas_station',
    'local_grocery_store',
    'local_hospital',
    'local_hotel',
    'local_laundry_service',
    'local_library',
    'local_mall',
    'local_movies',
    'local_offer',
    'local_parking',
    'local_pharmacy',
    'local_phone',
    'local_pizza',
    'local_play',
    'local_post_office',
    'local_printshop',
    'local_see',
    'local_shipping',
    'local_taxi',
    'location_city',
    'location_disabled',
    'location_off',
    'location_on',
    'location_searching',
    'lock',
    'lock_open',
    'lock_outline',
    'looks',
    'looks_3',
    'looks_4',
    'looks_5',
    'looks_6',
    'looks_one',
    'looks_two',
    'loop',
    'loupe',
    'loyalty',
    'mail',
    'map',
    'markunread',
    'markunread_mailbox',
    'memory',
    'menu',
    'merge_type',
    'message',
    'mic',
    'mic_none',
    'mic_off',
    'mms',
    'mode_comment',
    'mode_edit',
    'money_off',
    'monochrome_photos',
    'mood',
    'mood_bad',
    'more',
    'more_horiz',
    'more_vert',
    'mouse',
    'movie',
    'movie_creation',
    'music_note',
    'my_library_add',
    'my_library_books',
    'my_library_music',
    'my_location',
    'nature',
    'nature_people',
    'navigate_before',
    'navigate_next',
    'navigation',
    'network_cell',
    'network_locked',
    'network_wifi',
    'new_releases',
    'nfc',
    'no_sim',
    'not_interested',
    'note_add',
    'notifications',
    'notifications_active',
    'notifications_none',
    'notifications_off',
    'notifications_paused',
    'offline_pin',
    'ondemand_video',
    'open_in_browser',
    'open_in_new',
    'open_with',
    'pages',
    'pageview',
    'palette',
    'panorama',
    'panorama_fish_eye',
    'panorama_horizontal',
    'panorama_vertical',
    'panorama_wide_angle',
    'party_mode',
    'pause',
    'pause_circle_filled',
    'pause_circle_outline',
    'payment',
    'people',
    'people_outline',
    'perm_camera_mic',
    'perm_contact_calendar',
    'perm_data_setting',
    'perm_device_information',
    'perm_identity',
    'perm_media',
    'perm_phone_msg',
    'perm_scan_wifi',
    'person',
    'person_add',
    'person_outline',
    'person_pin',
    'personal_video',
    'phone',
    'phone_android',
    'phone_bluetooth_speaker',
    'phone_forwarded',
    'phone_in_talk',
    'phone_iphone',
    'phone_locked',
    'phone_missed',
    'phone_paused',
    'phonelink',
    'phonelink_erase',
    'phonelink_lock',
    'phonelink_off',
    'phonelink_ring',
    'phonelink_setup',
    'photo',
    'photo_album',
    'photo_camera',
    'photo_library',
    'photo_size_select_actual',
    'photo_size_select_large',
    'photo_size_select_small',
    'picture_as_pdf',
    'picture_in_picture',
    'pin_drop',
    'place',
    'play_arrow',
    'play_circle_filled',
    'play_circle_outline',
    'play_for_work',
    'play_shopping_bag',
    'playlist_add',
    'plus_one',
    'poll',
    'polymer',
    'portable_wifi_off',
    'portrait',
    'power',
    'power_input',
    'power_settings_new',
    'present_to_all',
    'print',
    'public',
    'publish',
    'query_builder',
    'question_answer',
    'queue',
    'queue_music',
    'radio',
    'radio_button_checked',
    'radio_button_unchecked',
    'rate_review',
    'receipt',
    'recent_actors',
    'redeem',
    'redo',
    'refresh',
    'remove',
    'remove_circle',
    'remove_circle_outline',
    'remove_red_eye',
    'reorder',
    'repeat',
    'repeat_one',
    'replay',
    'replay_10',
    'replay_30',
    'replay_5',
    'reply',
    'reply_all',
    'report',
    'report_problem',
    'restaurant_menu',
    'restore',
    'ring_volume',
    'room',
    'rotate_90_degrees_ccw',
    'rotate_left',
    'rotate_right',
    'router',
    'satellite',
    'save',
    'scanner',
    'schedule',
    'school',
    'screen_lock_landscape',
    'screen_lock_portrait',
    'screen_lock_rotation',
    'screen_rotation',
    'sd_card',
    'sd_storage',
    'search',
    'security',
    'select_all',
    'send',
    'settings',
    'settings_applications',
    'settings_backup_restore',
    'settings_bluetooth',
    'settings_brightness',
    'settings_cell',
    'settings_ethernet',
    'settings_input_antenna',
    'settings_input_component',
    'settings_input_composite',
    'settings_input_hdmi',
    'settings_input_svideo',
    'settings_overscan',
    'settings_phone',
    'settings_power',
    'settings_remote',
    'settings_system_daydream',
    'settings_voice',
    'share',
    'shop',
    'shop_two',
    'shopping_basket',
    'shopping_cart',
    'shuffle',
    'signal_cellular_4_bar',
    'signal_cellular_connected_no_internet_4_bar',
    'signal_cellular_no_sim',
    'signal_cellular_null',
    'signal_cellular_off',
    'signal_wifi_4_bar',
    'signal_wifi_4_bar_lock',
    'signal_wifi_off',
    'sim_card',
    'sim_card_alert',
    'skip_next',
    'skip_previous',
    'slideshow',
    'smartphone',
    'sms',
    'sms_failed',
    'snooze',
    'sort',
    'sort_by_alpha',
    'space_bar',
    'speaker',
    'speaker_group',
    'speaker_notes',
    'speaker_phone',
    'spellcheck',
    'star',
    'star_border',
    'star_half',
    'stars',
    'stay_current_landscape',
    'stay_current_portrait',
    'stay_primary_landscape',
    'stay_primary_portrait',
    'stop',
    'storage',
    'store',
    'store_mall_directory',
    'straighten',
    'strikethrough_s',
    'style',
    'subject',
    'subtitles',
    'supervisor_account',
    'surround_sound',
    'swap_calls',
    'swap_horiz',
    'swap_vert',
    'swap_vertical_circle',
    'switch_camera',
    'switch_video',
    'sync',
    'sync_disabled',
    'sync_problem',
    'system_update',
    'system_update_alt',
    'tab',
    'tab_unselected',
    'tablet',
    'tablet_android',
    'tablet_mac',
    'tag_faces',
    'tap_and_play',
    'terrain',
    'text_format',
    'textsms',
    'texture',
    'theaters',
    'thumb_down',
    'thumb_up',
    'thumbs_up_down',
    'time_to_leave',
    'timelapse',
    'timer',
    'timer_10',
    'timer_3',
    'timer_off',
    'toc',
    'today',
    'toll',
    'tonality',
    'toys',
    'track_changes',
    'traffic',
    'transform',
    'translate',
    'trending_down',
    'trending_flat',
    'trending_up',
    'tune',
    'turned_in',
    'turned_in_not',
    'tv',
    'undo',
    'unfold_less',
    'unfold_more',
    'usb',
    'verified_user',
    'vertical_align_bottom',
    'vertical_align_center',
    'vertical_align_top',
    'vibration',
    'video_library',
    'videocam',
    'videocam_off',
    'view_agenda',
    'view_array',
    'view_carousel',
    'view_column',
    'view_comfy',
    'view_compact',
    'view_day',
    'view_headline',
    'view_list',
    'view_module',
    'view_quilt',
    'view_stream',
    'view_week',
    'vignette',
    'visibility',
    'visibility_off',
    'voice_chat',
    'voicemail',
    'volume_down',
    'volume_mute',
    'volume_off',
    'volume_up',
    'vpn_key',
    'vpn_lock',
    'wallpaper',
    'warning',
    'watch',
    'wb_auto',
    'wb_cloudy',
    'wb_incandescent',
    'wb_iridescent',
    'wb_sunny',
    'wc',
    'web',
    'whatshot',
    'widgets',
    'wifi',
    'wifi_lock',
    'wifi_tethering',
    'work',
    'wrap_text',
    'youtube_searched_for',
    'zoom_in',
    'zoom_out',
  ];

  get icons(): string[] {
    return this._icons;
  }

  filter(query: string): string[] {
    return this.icons.filter((el: string) => {
      return el.toLowerCase().indexOf(query ? query.toLowerCase() : '') > -1;
    });
  }
}
