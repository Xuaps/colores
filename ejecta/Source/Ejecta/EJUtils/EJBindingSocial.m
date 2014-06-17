#import "EJBindingSocial.h"

@implementation EJBindingSocial


- (void)post:(NSString *)snsName message:(NSString *)message url:(NSString *)url imgSrc:(NSString *)imgSrc {
    SLComposeViewController *sns = nil;
    snsName = [snsName lowercaseString];
    
    if ([snsName isEqualToString:@"twitter"]){ //&& [SLComposeViewController isAvailableForServiceType:SLServiceTypeTwitter]) {
        sns = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeTwitter];
    }
    if ([snsName isEqualToString:@"facebook"]){ // && [SLComposeViewController isAvailableForServiceType:SLServiceTypeFacebook]) {
        sns = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeFacebook];
    }
    if (([snsName isEqualToString:@"sinaweibo"] || [snsName isEqualToString:@"weibo"]) && [SLComposeViewController isAvailableForServiceType:SLServiceTypeSinaWeibo]) {
        sns = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeSinaWeibo];
    }
    if ([snsName isEqualToString:@"tencentweibo"] && [SLComposeViewController isAvailableForServiceType:SLServiceTypeTencentWeibo]) {
        sns = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeTencentWeibo];
    }
    NSLog(@"sns %@",sns);
    if (sns) {
        [sns setInitialText:message];
        if ([imgSrc length] == 0) {
            imgSrc = [NSString stringWithFormat:@"%@%@", [scriptView appFolder], imgSrc];
            UIImage *img = [UIImage imageNamed:imgSrc];
            if (img) {
                bool ok = [sns addImage:img];
                NSLog(@"addImage %d", ok);
            }
        }else{
            // set the screen size, adjust for over scaled image
            NSInteger width = (gameWidth*[UIScreen mainScreen].scale);
            NSInteger height = (gameHeight*[UIScreen mainScreen].scale);
            
            NSInteger myDataLength = width * height * 4;
            
            // read the pixel data
            GLubyte *buffer = (GLubyte *) malloc(myDataLength);
            glReadPixels(0, 0, width, height, GL_RGBA, GL_UNSIGNED_BYTE, buffer);
            
            // gl renders "upside down" so swap top to bottom into new array.
            // there's gotta be a better way, but this works.
            GLubyte *buffer2 = (GLubyte *) malloc(myDataLength);
            for(int y = 0; y < height; y++)
            {
                for(int x = 0; x < width * 4; x++)
                {
                    buffer2[(height - 1 - y) * width * 4 + x] = buffer[y * 4 * width + x];
                }
            }
            
            CGDataProviderRef provider = CGDataProviderCreateWithData(NULL, buffer2, myDataLength, NULL);
            
            int bitsPerComponent = 8;
            int bitsPerPixel = 32;
            int bytesPerRow = 4 * width;
            CGColorSpaceRef colorSpaceRef = CGColorSpaceCreateDeviceRGB();
            CGBitmapInfo bitmapInfo = kCGBitmapByteOrderDefault;
            CGColorRenderingIntent renderingIntent = kCGRenderingIntentDefault;

            CGImageRef imageRef = CGImageCreate(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, colorSpaceRef, bitmapInfo, provider, NULL, NO, renderingIntent);
            [sns addImage:[UIImage imageWithCGImage:imageRef]];
        }
        if (url) {
            [sns addURL:[[NSURL alloc] initWithString:url]];
        }
        
        [sns setCompletionHandler: ^(SLComposeViewControllerResult result) {
            switch (result) {
                case SLComposeViewControllerResultDone:
                    NSLog(@"Done");
                    break;
                    
                case SLComposeViewControllerResultCancelled:
                    NSLog(@"Cancelled");
                    break;
                    
                default:
                    NSLog(@"Other Exception");
                    break;
            }
            [sns dismissViewControllerAnimated:YES completion:nil];
        }];
        
        //      [scriptView.window.rootViewController presentModalViewController:sns animated:YES];
        [scriptView.window.rootViewController presentViewController:sns animated:YES completion:nil];
    }
}

EJ_BIND_FUNCTION(post, ctx, argc, argv)
{
    if (![SLComposeViewController class]) {
        return JSValueMakeBoolean(ctx, false);
    }
    NSString *snsName = JSValueToNSString(ctx, argv[0]);
    NSString *message = JSValueToNSString(ctx, argv[1]);
    NSString *url = JSValueToNSString(ctx, argv[2]);
    NSString *imgSrc = JSValueToNSString(ctx, argv[3]);
    //
    [self post:snsName message:message url:url imgSrc:imgSrc];
    NSLog(@"SNS %@ %@ %@ %@", snsName, message, url, imgSrc);
    
    return JSValueMakeBoolean(ctx, true);
}

EJ_BIND_GET( gameHeight, ctx ) {
    return JSValueMakeNumber( ctx, gameHeight );
}
EJ_BIND_GET( gameWidth, ctx ) {
    return JSValueMakeNumber( ctx, gameWidth );
}
EJ_BIND_SET( gameHeight, ctx, value) {
    gameHeight = JSValueToNumberFast( ctx, value);
}
EJ_BIND_SET( gameWidth, ctx, value) {
    gameWidth = JSValueToNumberFast( ctx, value);
}
@end